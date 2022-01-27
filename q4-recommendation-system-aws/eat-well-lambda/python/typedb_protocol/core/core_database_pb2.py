# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: core/core_database.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='core/core_database.proto',
  package='typedb.protocol',
  syntax='proto3',
  serialized_options=_b('\n\033com.vaticle.typedb.protocolB\021CoreDatabaseProto'),
  serialized_pb=_b('\n\x18\x63ore/core_database.proto\x12\x0ftypedb.protocol\"\xb6\x01\n\x13\x43oreDatabaseManager\x1aH\n\x08\x43ontains\x1a\x19\n\x03Req\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x1a!\n\x03Res\x12\x1a\n\x08\x63ontains\x18\x01 \x01(\x08R\x08\x63ontains\x1a*\n\x06\x43reate\x1a\x19\n\x03Req\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x1a\x05\n\x03Res\x1a)\n\x03\x41ll\x1a\x05\n\x03Req\x1a\x1b\n\x03Res\x12\x14\n\x05names\x18\x01 \x03(\tR\x05names\"~\n\x0c\x43oreDatabase\x1a\x42\n\x06Schema\x1a\x19\n\x03Req\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x1a\x1d\n\x03Res\x12\x16\n\x06schema\x18\x01 \x01(\tR\x06schema\x1a*\n\x06\x44\x65lete\x1a\x19\n\x03Req\x12\x12\n\x04name\x18\x01 \x01(\tR\x04name\x1a\x05\n\x03ResB0\n\x1b\x63om.vaticle.typedb.protocolB\x11\x43oreDatabaseProtob\x06proto3')
)




_COREDATABASEMANAGER_CONTAINS_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.CoreDatabaseManager.Contains.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='typedb.protocol.CoreDatabaseManager.Contains.Req.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='name', file=DESCRIPTOR),
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
  serialized_start=81,
  serialized_end=106,
)

_COREDATABASEMANAGER_CONTAINS_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.CoreDatabaseManager.Contains.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='contains', full_name='typedb.protocol.CoreDatabaseManager.Contains.Res.contains', index=0,
      number=1, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='contains', file=DESCRIPTOR),
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
  serialized_start=108,
  serialized_end=141,
)

_COREDATABASEMANAGER_CONTAINS = _descriptor.Descriptor(
  name='Contains',
  full_name='typedb.protocol.CoreDatabaseManager.Contains',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASEMANAGER_CONTAINS_REQ, _COREDATABASEMANAGER_CONTAINS_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=69,
  serialized_end=141,
)

_COREDATABASEMANAGER_CREATE_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.CoreDatabaseManager.Create.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='typedb.protocol.CoreDatabaseManager.Create.Req.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='name', file=DESCRIPTOR),
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
  serialized_start=81,
  serialized_end=106,
)

_COREDATABASEMANAGER_CREATE_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.CoreDatabaseManager.Create.Res',
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
  serialized_start=108,
  serialized_end=113,
)

_COREDATABASEMANAGER_CREATE = _descriptor.Descriptor(
  name='Create',
  full_name='typedb.protocol.CoreDatabaseManager.Create',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASEMANAGER_CREATE_REQ, _COREDATABASEMANAGER_CREATE_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=143,
  serialized_end=185,
)

_COREDATABASEMANAGER_ALL_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.CoreDatabaseManager.All.Req',
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
  serialized_start=81,
  serialized_end=86,
)

_COREDATABASEMANAGER_ALL_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.CoreDatabaseManager.All.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='names', full_name='typedb.protocol.CoreDatabaseManager.All.Res.names', index=0,
      number=1, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='names', file=DESCRIPTOR),
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
  serialized_start=201,
  serialized_end=228,
)

_COREDATABASEMANAGER_ALL = _descriptor.Descriptor(
  name='All',
  full_name='typedb.protocol.CoreDatabaseManager.All',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASEMANAGER_ALL_REQ, _COREDATABASEMANAGER_ALL_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=187,
  serialized_end=228,
)

_COREDATABASEMANAGER = _descriptor.Descriptor(
  name='CoreDatabaseManager',
  full_name='typedb.protocol.CoreDatabaseManager',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASEMANAGER_CONTAINS, _COREDATABASEMANAGER_CREATE, _COREDATABASEMANAGER_ALL, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=46,
  serialized_end=228,
)


_COREDATABASE_SCHEMA_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.CoreDatabase.Schema.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='typedb.protocol.CoreDatabase.Schema.Req.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='name', file=DESCRIPTOR),
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
  serialized_start=81,
  serialized_end=106,
)

_COREDATABASE_SCHEMA_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.CoreDatabase.Schema.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='schema', full_name='typedb.protocol.CoreDatabase.Schema.Res.schema', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='schema', file=DESCRIPTOR),
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
  serialized_start=283,
  serialized_end=312,
)

_COREDATABASE_SCHEMA = _descriptor.Descriptor(
  name='Schema',
  full_name='typedb.protocol.CoreDatabase.Schema',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASE_SCHEMA_REQ, _COREDATABASE_SCHEMA_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=246,
  serialized_end=312,
)

_COREDATABASE_DELETE_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.CoreDatabase.Delete.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='name', full_name='typedb.protocol.CoreDatabase.Delete.Req.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='name', file=DESCRIPTOR),
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
  serialized_start=81,
  serialized_end=106,
)

_COREDATABASE_DELETE_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.CoreDatabase.Delete.Res',
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
  serialized_start=108,
  serialized_end=113,
)

_COREDATABASE_DELETE = _descriptor.Descriptor(
  name='Delete',
  full_name='typedb.protocol.CoreDatabase.Delete',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASE_DELETE_REQ, _COREDATABASE_DELETE_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=314,
  serialized_end=356,
)

_COREDATABASE = _descriptor.Descriptor(
  name='CoreDatabase',
  full_name='typedb.protocol.CoreDatabase',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_COREDATABASE_SCHEMA, _COREDATABASE_DELETE, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=230,
  serialized_end=356,
)

_COREDATABASEMANAGER_CONTAINS_REQ.containing_type = _COREDATABASEMANAGER_CONTAINS
_COREDATABASEMANAGER_CONTAINS_RES.containing_type = _COREDATABASEMANAGER_CONTAINS
_COREDATABASEMANAGER_CONTAINS.containing_type = _COREDATABASEMANAGER
_COREDATABASEMANAGER_CREATE_REQ.containing_type = _COREDATABASEMANAGER_CREATE
_COREDATABASEMANAGER_CREATE_RES.containing_type = _COREDATABASEMANAGER_CREATE
_COREDATABASEMANAGER_CREATE.containing_type = _COREDATABASEMANAGER
_COREDATABASEMANAGER_ALL_REQ.containing_type = _COREDATABASEMANAGER_ALL
_COREDATABASEMANAGER_ALL_RES.containing_type = _COREDATABASEMANAGER_ALL
_COREDATABASEMANAGER_ALL.containing_type = _COREDATABASEMANAGER
_COREDATABASE_SCHEMA_REQ.containing_type = _COREDATABASE_SCHEMA
_COREDATABASE_SCHEMA_RES.containing_type = _COREDATABASE_SCHEMA
_COREDATABASE_SCHEMA.containing_type = _COREDATABASE
_COREDATABASE_DELETE_REQ.containing_type = _COREDATABASE_DELETE
_COREDATABASE_DELETE_RES.containing_type = _COREDATABASE_DELETE
_COREDATABASE_DELETE.containing_type = _COREDATABASE
DESCRIPTOR.message_types_by_name['CoreDatabaseManager'] = _COREDATABASEMANAGER
DESCRIPTOR.message_types_by_name['CoreDatabase'] = _COREDATABASE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

CoreDatabaseManager = _reflection.GeneratedProtocolMessageType('CoreDatabaseManager', (_message.Message,), dict(

  Contains = _reflection.GeneratedProtocolMessageType('Contains', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_CONTAINS_REQ,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Contains.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_CONTAINS_RES,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Contains.Res)
      ))
    ,
    DESCRIPTOR = _COREDATABASEMANAGER_CONTAINS,
    __module__ = 'core.core_database_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Contains)
    ))
  ,

  Create = _reflection.GeneratedProtocolMessageType('Create', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_CREATE_REQ,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Create.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_CREATE_RES,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Create.Res)
      ))
    ,
    DESCRIPTOR = _COREDATABASEMANAGER_CREATE,
    __module__ = 'core.core_database_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.Create)
    ))
  ,

  All = _reflection.GeneratedProtocolMessageType('All', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_ALL_REQ,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.All.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASEMANAGER_ALL_RES,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.All.Res)
      ))
    ,
    DESCRIPTOR = _COREDATABASEMANAGER_ALL,
    __module__ = 'core.core_database_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager.All)
    ))
  ,
  DESCRIPTOR = _COREDATABASEMANAGER,
  __module__ = 'core.core_database_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabaseManager)
  ))
_sym_db.RegisterMessage(CoreDatabaseManager)
_sym_db.RegisterMessage(CoreDatabaseManager.Contains)
_sym_db.RegisterMessage(CoreDatabaseManager.Contains.Req)
_sym_db.RegisterMessage(CoreDatabaseManager.Contains.Res)
_sym_db.RegisterMessage(CoreDatabaseManager.Create)
_sym_db.RegisterMessage(CoreDatabaseManager.Create.Req)
_sym_db.RegisterMessage(CoreDatabaseManager.Create.Res)
_sym_db.RegisterMessage(CoreDatabaseManager.All)
_sym_db.RegisterMessage(CoreDatabaseManager.All.Req)
_sym_db.RegisterMessage(CoreDatabaseManager.All.Res)

CoreDatabase = _reflection.GeneratedProtocolMessageType('CoreDatabase', (_message.Message,), dict(

  Schema = _reflection.GeneratedProtocolMessageType('Schema', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASE_SCHEMA_REQ,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Schema.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASE_SCHEMA_RES,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Schema.Res)
      ))
    ,
    DESCRIPTOR = _COREDATABASE_SCHEMA,
    __module__ = 'core.core_database_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Schema)
    ))
  ,

  Delete = _reflection.GeneratedProtocolMessageType('Delete', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASE_DELETE_REQ,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Delete.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _COREDATABASE_DELETE_RES,
      __module__ = 'core.core_database_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Delete.Res)
      ))
    ,
    DESCRIPTOR = _COREDATABASE_DELETE,
    __module__ = 'core.core_database_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase.Delete)
    ))
  ,
  DESCRIPTOR = _COREDATABASE,
  __module__ = 'core.core_database_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.CoreDatabase)
  ))
_sym_db.RegisterMessage(CoreDatabase)
_sym_db.RegisterMessage(CoreDatabase.Schema)
_sym_db.RegisterMessage(CoreDatabase.Schema.Req)
_sym_db.RegisterMessage(CoreDatabase.Schema.Res)
_sym_db.RegisterMessage(CoreDatabase.Delete)
_sym_db.RegisterMessage(CoreDatabase.Delete.Req)
_sym_db.RegisterMessage(CoreDatabase.Delete.Res)


DESCRIPTOR._options = None
# @@protoc_insertion_point(module_scope)