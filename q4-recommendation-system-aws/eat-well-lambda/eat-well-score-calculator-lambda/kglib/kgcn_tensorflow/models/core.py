#
#  Copyright (C) 2021 Vaticle
#
#  Licensed to the Apache Software Foundation (ASF) under one
#  or more contributor license agreements.  See the NOTICE file
#  distributed with this work for additional information
#  regarding copyright ownership.  The ASF licenses this file
#  to you under the Apache License, Version 2.0 (the
#  "License"); you may not use this file except in compliance
#  with the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing,
#  software distributed under the License is distributed on an
#  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
#  specific language governing permissions and limitations
#  under the License.
#

import numpy as np
import sonnet as snt
from graph_nets import modules
from graph_nets import utils_tf
from graph_nets.modules import GraphIndependent


def softmax(x):
    return np.exp(x) / np.sum(np.exp(x))


def make_mlp_model(latent_size=16, num_layers=2):
    """Instantiates a new MLP, followed by LayerNorm.

    The parameters of each new MLP are not shared with others generated by
    this function.

    Returns:
      A Sonnet module which contains the MLP and LayerNorm.
    """
    return snt.Sequential([
        snt.nets.MLP([latent_size] * num_layers, activate_final=True),
        snt.LayerNorm()
    ])


class MLPGraphIndependent(snt.AbstractModule):
    """GraphIndependent with MLP edge, node, and global models."""

    def __init__(self, name="MLPGraphIndependent"):
        super(MLPGraphIndependent, self).__init__(name=name)
        with self._enter_variable_scope():
            self._network = GraphIndependent(
                edge_model_fn=make_mlp_model,
                node_model_fn=make_mlp_model)

    def _build(self, inputs):
        return self._network(inputs)


class MLPInteractionNetwork(snt.AbstractModule):
    """InteractionNetwork with MLP edge, node, and global models."""

    def __init__(self, name="MLPInteractionNetwork"):
        super(MLPInteractionNetwork, self).__init__(name=name)
        with self._enter_variable_scope():
            self._network = modules.InteractionNetwork(make_mlp_model, make_mlp_model)

    def _build(self, inputs):
        return self._network(inputs)


class KGCN(snt.AbstractModule):
    """
    A KGCN Neural Network with Message Passing. Implemented as a Sonnet Module.
    """

    def __init__(self,
                 thing_embedder,
                 role_embedder,
                 edge_output_size=3,
                 node_output_size=3,
                 latent_size=16,
                 num_layers=2,
                 name="KGCN"):
        super(KGCN, self).__init__(name=name)

        self._thing_embedder = thing_embedder
        self._role_embedder = role_embedder

        self._latent_size = latent_size
        self._num_layers = num_layers

        # Transforms the outputs into the appropriate shapes.
        if edge_output_size is None:
            edge_fn = None
        else:
            edge_fn = lambda: snt.Linear(edge_output_size, name="edge_output")
        if node_output_size is None:
            node_fn = None
        else:
            node_fn = lambda: snt.Linear(node_output_size, name="node_output")
        with self._enter_variable_scope():
            self._encoder = self._kg_encoder()
            self._core = MLPInteractionNetwork()
            self._decoder = MLPGraphIndependent()
            self._output_transform = modules.GraphIndependent(edge_fn, node_fn)

    def _edge_model(self):
        return snt.Sequential([self._role_embedder,
                               snt.nets.MLP([self._latent_size] * self._num_layers, activate_final=True),
                               snt.LayerNorm()])

    def _node_model(self):
        return snt.Sequential([self._thing_embedder,
                               snt.nets.MLP([self._latent_size] * self._num_layers, activate_final=True),
                               snt.LayerNorm()])

    def _kg_encoder(self):
        return GraphIndependent(self._edge_model, self._node_model, name='kg_encoder')

    def _build(self, input_op, num_processing_steps):
        latent = self._encoder(input_op)
        latent0 = latent
        output_ops = []
        for _ in range(num_processing_steps):
            core_input = utils_tf.concat([latent0, latent], axis=1)
            latent = self._core(core_input)
            decoded_op = self._decoder(latent)
            output_ops.append(self._output_transform(decoded_op))
        return output_ops
