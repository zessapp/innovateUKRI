# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: cluster/cluster_server.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='cluster/cluster_server.proto',
  package='typedb.protocol',
  syntax='proto3',
  serialized_options=_b('\n\033com.vaticle.typedb.protocolB\022ClusterServerProto'),
  serialized_pb=_b('\n\x1c\x63luster/cluster_server.proto\x12\x0ftypedb.protocol\"W\n\rServerManager\x1a\x46\n\x03\x41ll\x1a\x05\n\x03Req\x1a\x38\n\x03Res\x12\x31\n\x07servers\x18\x01 \x03(\x0b\x32\x17.typedb.protocol.ServerR\x07servers\"\"\n\x06Server\x12\x18\n\x07\x61\x64\x64ress\x18\x01 \x01(\tR\x07\x61\x64\x64ressB1\n\x1b\x63om.vaticle.typedb.protocolB\x12\x43lusterServerProtob\x06proto3')
)




_SERVERMANAGER_ALL_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.ServerManager.All.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=73,
  serialized_end=78,
)

_SERVERMANAGER_ALL_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.ServerManager.All.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='servers', full_name='typedb.protocol.ServerManager.All.Res.servers', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='servers', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=80,
  serialized_end=136,
)

_SERVERMANAGER_ALL = _descriptor.Descriptor(
  name='All',
  full_name='typedb.protocol.ServerManager.All',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SERVERMANAGER_ALL_REQ, _SERVERMANAGER_ALL_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=66,
  serialized_end=136,
)

_SERVERMANAGER = _descriptor.Descriptor(
  name='ServerManager',
  full_name='typedb.protocol.ServerManager',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SERVERMANAGER_ALL, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=49,
  serialized_end=136,
)


_SERVER = _descriptor.Descriptor(
  name='Server',
  full_name='typedb.protocol.Server',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='address', full_name='typedb.protocol.Server.address', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='address', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=138,
  serialized_end=172,
)

_SERVERMANAGER_ALL_REQ.containing_type = _SERVERMANAGER_ALL
_SERVERMANAGER_ALL_RES.fields_by_name['servers'].message_type = _SERVER
_SERVERMANAGER_ALL_RES.containing_type = _SERVERMANAGER_ALL
_SERVERMANAGER_ALL.containing_type = _SERVERMANAGER
DESCRIPTOR.message_types_by_name['ServerManager'] = _SERVERMANAGER
DESCRIPTOR.message_types_by_name['Server'] = _SERVER
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

ServerManager = _reflection.GeneratedProtocolMessageType('ServerManager', (_message.Message,), dict(

  All = _reflection.GeneratedProtocolMessageType('All', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _SERVERMANAGER_ALL_REQ,
      __module__ = 'cluster.cluster_server_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.ServerManager.All.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _SERVERMANAGER_ALL_RES,
      __module__ = 'cluster.cluster_server_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.ServerManager.All.Res)
      ))
    ,
    DESCRIPTOR = _SERVERMANAGER_ALL,
    __module__ = 'cluster.cluster_server_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.ServerManager.All)
    ))
  ,
  DESCRIPTOR = _SERVERMANAGER,
  __module__ = 'cluster.cluster_server_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.ServerManager)
  ))
_sym_db.RegisterMessage(ServerManager)
_sym_db.RegisterMessage(ServerManager.All)
_sym_db.RegisterMessage(ServerManager.All.Req)
_sym_db.RegisterMessage(ServerManager.All.Res)

Server = _reflection.GeneratedProtocolMessageType('Server', (_message.Message,), dict(
  DESCRIPTOR = _SERVER,
  __module__ = 'cluster.cluster_server_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.Server)
  ))
_sym_db.RegisterMessage(Server)


DESCRIPTOR._options = None
# @@protoc_insertion_point(module_scope)
