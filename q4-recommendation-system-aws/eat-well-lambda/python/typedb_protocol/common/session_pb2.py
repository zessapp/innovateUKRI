# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: common/session.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from typedb_protocol.common import options_pb2 as common_dot_options__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='common/session.proto',
  package='typedb.protocol',
  syntax='proto3',
  serialized_options=_b('\n\033com.vaticle.typedb.protocolB\014SessionProto'),
  serialized_pb=_b('\n\x14\x63ommon/session.proto\x12\x0ftypedb.protocol\x1a\x14\x63ommon/options.proto\"\x99\x03\n\x07Session\x1a\xed\x01\n\x04Open\x1a\x88\x01\n\x03Req\x12\x1a\n\x08\x64\x61tabase\x18\x01 \x01(\tR\x08\x64\x61tabase\x12\x31\n\x04type\x18\x02 \x01(\x0e\x32\x1d.typedb.protocol.Session.TypeR\x04type\x12\x32\n\x07options\x18\x03 \x01(\x0b\x32\x18.typedb.protocol.OptionsR\x07options\x1aZ\n\x03Res\x12\x1d\n\nsession_id\x18\x01 \x01(\x0cR\tsessionId\x12\x34\n\x16server_duration_millis\x18\x02 \x01(\x05R\x14serverDurationMillis\x1a\x34\n\x05\x43lose\x1a$\n\x03Req\x12\x1d\n\nsession_id\x18\x01 \x01(\x0cR\tsessionId\x1a\x05\n\x03Res\x1aJ\n\x05Pulse\x1a$\n\x03Req\x12\x1d\n\nsession_id\x18\x01 \x01(\x0cR\tsessionId\x1a\x1b\n\x03Res\x12\x14\n\x05\x61live\x18\x01 \x01(\x08R\x05\x61live\"\x1c\n\x04Type\x12\x08\n\x04\x44\x41TA\x10\x00\x12\n\n\x06SCHEMA\x10\x01\x42+\n\x1b\x63om.vaticle.typedb.protocolB\x0cSessionProtob\x06proto3')
  ,
  dependencies=[common_dot_options__pb2.DESCRIPTOR,])



_SESSION_TYPE = _descriptor.EnumDescriptor(
  name='Type',
  full_name='typedb.protocol.Session.Type',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='DATA', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='SCHEMA', index=1, number=1,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=445,
  serialized_end=473,
)
_sym_db.RegisterEnumDescriptor(_SESSION_TYPE)


_SESSION_OPEN_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.Session.Open.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='database', full_name='typedb.protocol.Session.Open.Req.database', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='database', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='type', full_name='typedb.protocol.Session.Open.Req.type', index=1,
      number=2, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='type', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='options', full_name='typedb.protocol.Session.Open.Req.options', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='options', file=DESCRIPTOR),
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
  serialized_start=85,
  serialized_end=221,
)

_SESSION_OPEN_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.Session.Open.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='session_id', full_name='typedb.protocol.Session.Open.Res.session_id', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=_b(""),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='sessionId', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='server_duration_millis', full_name='typedb.protocol.Session.Open.Res.server_duration_millis', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='serverDurationMillis', file=DESCRIPTOR),
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
  serialized_start=223,
  serialized_end=313,
)

_SESSION_OPEN = _descriptor.Descriptor(
  name='Open',
  full_name='typedb.protocol.Session.Open',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SESSION_OPEN_REQ, _SESSION_OPEN_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=76,
  serialized_end=313,
)

_SESSION_CLOSE_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.Session.Close.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='session_id', full_name='typedb.protocol.Session.Close.Req.session_id', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=_b(""),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='sessionId', file=DESCRIPTOR),
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
  serialized_start=324,
  serialized_end=360,
)

_SESSION_CLOSE_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.Session.Close.Res',
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
  serialized_start=223,
  serialized_end=228,
)

_SESSION_CLOSE = _descriptor.Descriptor(
  name='Close',
  full_name='typedb.protocol.Session.Close',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SESSION_CLOSE_REQ, _SESSION_CLOSE_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=315,
  serialized_end=367,
)

_SESSION_PULSE_REQ = _descriptor.Descriptor(
  name='Req',
  full_name='typedb.protocol.Session.Pulse.Req',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='session_id', full_name='typedb.protocol.Session.Pulse.Req.session_id', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=_b(""),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='sessionId', file=DESCRIPTOR),
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
  serialized_start=324,
  serialized_end=360,
)

_SESSION_PULSE_RES = _descriptor.Descriptor(
  name='Res',
  full_name='typedb.protocol.Session.Pulse.Res',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='alive', full_name='typedb.protocol.Session.Pulse.Res.alive', index=0,
      number=1, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='alive', file=DESCRIPTOR),
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
  serialized_start=416,
  serialized_end=443,
)

_SESSION_PULSE = _descriptor.Descriptor(
  name='Pulse',
  full_name='typedb.protocol.Session.Pulse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SESSION_PULSE_REQ, _SESSION_PULSE_RES, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=369,
  serialized_end=443,
)

_SESSION = _descriptor.Descriptor(
  name='Session',
  full_name='typedb.protocol.Session',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[_SESSION_OPEN, _SESSION_CLOSE, _SESSION_PULSE, ],
  enum_types=[
    _SESSION_TYPE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=64,
  serialized_end=473,
)

_SESSION_OPEN_REQ.fields_by_name['type'].enum_type = _SESSION_TYPE
_SESSION_OPEN_REQ.fields_by_name['options'].message_type = common_dot_options__pb2._OPTIONS
_SESSION_OPEN_REQ.containing_type = _SESSION_OPEN
_SESSION_OPEN_RES.containing_type = _SESSION_OPEN
_SESSION_OPEN.containing_type = _SESSION
_SESSION_CLOSE_REQ.containing_type = _SESSION_CLOSE
_SESSION_CLOSE_RES.containing_type = _SESSION_CLOSE
_SESSION_CLOSE.containing_type = _SESSION
_SESSION_PULSE_REQ.containing_type = _SESSION_PULSE
_SESSION_PULSE_RES.containing_type = _SESSION_PULSE
_SESSION_PULSE.containing_type = _SESSION
_SESSION_TYPE.containing_type = _SESSION
DESCRIPTOR.message_types_by_name['Session'] = _SESSION
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Session = _reflection.GeneratedProtocolMessageType('Session', (_message.Message,), dict(

  Open = _reflection.GeneratedProtocolMessageType('Open', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_OPEN_REQ,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Open.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_OPEN_RES,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Open.Res)
      ))
    ,
    DESCRIPTOR = _SESSION_OPEN,
    __module__ = 'common.session_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Open)
    ))
  ,

  Close = _reflection.GeneratedProtocolMessageType('Close', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_CLOSE_REQ,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Close.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_CLOSE_RES,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Close.Res)
      ))
    ,
    DESCRIPTOR = _SESSION_CLOSE,
    __module__ = 'common.session_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Close)
    ))
  ,

  Pulse = _reflection.GeneratedProtocolMessageType('Pulse', (_message.Message,), dict(

    Req = _reflection.GeneratedProtocolMessageType('Req', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_PULSE_REQ,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Pulse.Req)
      ))
    ,

    Res = _reflection.GeneratedProtocolMessageType('Res', (_message.Message,), dict(
      DESCRIPTOR = _SESSION_PULSE_RES,
      __module__ = 'common.session_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Pulse.Res)
      ))
    ,
    DESCRIPTOR = _SESSION_PULSE,
    __module__ = 'common.session_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Session.Pulse)
    ))
  ,
  DESCRIPTOR = _SESSION,
  __module__ = 'common.session_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.Session)
  ))
_sym_db.RegisterMessage(Session)
_sym_db.RegisterMessage(Session.Open)
_sym_db.RegisterMessage(Session.Open.Req)
_sym_db.RegisterMessage(Session.Open.Res)
_sym_db.RegisterMessage(Session.Close)
_sym_db.RegisterMessage(Session.Close.Req)
_sym_db.RegisterMessage(Session.Close.Res)
_sym_db.RegisterMessage(Session.Pulse)
_sym_db.RegisterMessage(Session.Pulse.Req)
_sym_db.RegisterMessage(Session.Pulse.Res)


DESCRIPTOR._options = None
# @@protoc_insertion_point(module_scope)
