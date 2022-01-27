import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as  ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import { join } from "path";
import { Peer, Port, Protocol, SubnetType } from '@aws-cdk/aws-ec2';

export class ZessGraknNew extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


       // CDK will take care of push & pull

    //Make the docker image
    const image = new DockerImageAsset(this, "BackendImage", {
      directory: join(__dirname, "..", "service"),
    })

    // set up the virtual private connection for ECS -
    const vpc = new ec2.Vpc(this, "ApplicationVpc", { 
            maxAzs: 2,
            enableDnsHostnames: true,
            enableDnsSupport: true,
            cidr: '10.16.0.0/23', 
            // We will utilise isolated subnets. Autoconfigs a NAT gateway if we go private only.       
            subnetConfiguration: [
              {
                cidrMask: 26,
                name: 'isolated',
                subnetType: ec2.SubnetType.ISOLATED            
              }
            ]
          
          })
    
    // Let's create the SG instead of letting CDK generate one. 
    const vpcEndpointSecurityGroup = new ec2.SecurityGroup(
      this,
      'endpoint-security-group', {
        allowAllOutbound: true,
        vpc
      }
    );

    // Set up the ECS
    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
      clusterName: "TypeDB"
      })

      // Add capacity to the cluster - setting to large`
      cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.SMALL),
        maxCapacity:1,
        minCapacity:1,
        keyName: "Grakn-key", // Made this key pair
        associatePublicIpAddress: false, ///False if private
        canContainersAccessInstanceRole: true,
        allowAllOutbound: true,
        vpcSubnets: {subnetType: SubnetType.PRIVATE} //Can set public
      })//.connections.allowFrom(ec2.Peer.anyIpv4(), ec2.Port.allTcp(), "Allow SSH from anyone and anything" ) 

    /**
     * Create a new task definition for the Grakn service
     */
    const taskDefinition = new ecs.Ec2TaskDefinition(this, "TypeDBTaskDefinition", {
      //networkMode: ecs.NetworkMode.HOST,
      // executionRole: taskImageOptions.executionRole,
      // taskRole: taskImageOptions.taskRole,
      family: "TypeDBTaskDefinitionFamily",
    })

    /**
     * Add the Grakn container to the task definition and customise the container props
     */
    taskDefinition.addContainer('GraknContainer', {
      image: ecs.ContainerImage.fromDockerImageAsset(image),
      memoryLimitMiB: 512,
      logging: new ecs.AwsLogDriver({streamPrefix: this.node.id}),
      //command: ["grakn", "server", "start"]
      // command: ["echo 'Hello Grakn'"],
      // entryPoint: ["/bin"],
    }).addPortMappings({
      containerPort: 1729, 
      hostPort: 1729, 
      protocol: ecs.Protocol.TCP
    })

    /** 
     * Utilise fargate (serverless compute engine for containers - ECS/EKS) 
     * Add the fargate service frontend via application load balancer 
     * Make this public
     * */ 
    const service = new ecs_patterns.ApplicationLoadBalancedEc2Service( this,         
      "ApplicationLoadBalancedFargateService",
      {
        cluster: cluster,
        cpu: 256,
        desiredCount: 1,
        memoryLimitMiB: 512,
        //assignPublicIp: true,
        listenerPort: 1729,
        // taskImageOptions: {
        //   image: ecs.ContainerImage.fromDockerImageAsset(image),
        //   containerName: 'Grakn',
        //   containerPort: 48555
        // },
        publicLoadBalancer: true,
        serviceName: "ZessTypeDBServiceEC2",
        taskDefinition: taskDefinition,
      }
    )
    
  }
}