# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: common/answer.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from typedb_protocol.common import concept_pb2 as common_dot_concept__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='common/answer.proto',
  package='typedb.protocol',
  syntax='proto3',
  serialized_options=_b('\n\033com.vaticle.typedb.protocolB\013AnswerProto'),
  serialized_pb=_b('\n\x13\x63ommon/answer.proto\x12\x0ftypedb.protocol\x1a\x14\x63ommon/concept.proto\"\xd9\x01\n\nConceptMap\x12\x36\n\x03map\x18\x01 \x03(\x0b\x32$.typedb.protocol.ConceptMap.MapEntryR\x03map\x12\x41\n\x0c\x65xplainables\x18\x02 \x01(\x0b\x32\x1d.typedb.protocol.ExplainablesR\x0c\x65xplainables\x1aP\n\x08MapEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12.\n\x05value\x18\x02 \x01(\x0b\x32\x18.typedb.protocol.ConceptR\x05value:\x02\x38\x01\"\xbd\x05\n\x0c\x45xplainables\x12J\n\trelations\x18\x01 \x03(\x0b\x32,.typedb.protocol.Explainables.RelationsEntryR\trelations\x12M\n\nattributes\x18\x02 \x03(\x0b\x32-.typedb.protocol.Explainables.AttributesEntryR\nattributes\x12M\n\nownerships\x18\x03 \x03(\x0b\x32-.typedb.protocol.Explainables.OwnershipsEntryR\nownerships\x1aZ\n\x0eRelationsEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x32\n\x05value\x18\x02 \x01(\x0b\x32\x1c.typedb.protocol.ExplainableR\x05value:\x02\x38\x01\x1a[\n\x0f\x41ttributesEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x32\n\x05value\x18\x02 \x01(\x0b\x32\x1c.typedb.protocol.ExplainableR\x05value:\x02\x38\x01\x1a\x62\n\x0fOwnershipsEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x39\n\x05value\x18\x02 \x01(\x0b\x32#.typedb.protocol.Explainables.OwnedR\x05value:\x02\x38\x01\x1a\xa5\x01\n\x05Owned\x12\x44\n\x05owned\x18\x01 \x03(\x0b\x32..typedb.protocol.Explainables.Owned.OwnedEntryR\x05owned\x1aV\n\nOwnedEntry\x12\x10\n\x03key\x18\x01 \x01(\tR\x03key\x12\x32\n\x05value\x18\x02 \x01(\x0b\x32\x1c.typedb.protocol.ExplainableR\x05value:\x02\x38\x01\"?\n\x0b\x45xplainable\x12 \n\x0b\x63onjunction\x18\x01 \x01(\tR\x0b\x63onjunction\x12\x0e\n\x02id\x18\x02 \x01(\x03R\x02id\"\x81\x01\n\x0f\x43onceptMapGroup\x12.\n\x05owner\x18\x01 \x01(\x0b\x32\x18.typedb.protocol.ConceptR\x05owner\x12>\n\x0c\x63oncept_maps\x18\x02 \x03(\x0b\x32\x1b.typedb.protocol.ConceptMapR\x0b\x63onceptMaps\"l\n\x07Numeric\x12\x1f\n\nlong_value\x18\x01 \x01(\x03H\x00R\tlongValue\x12#\n\x0c\x64ouble_value\x18\x02 \x01(\x01H\x00R\x0b\x64oubleValue\x12\x12\n\x03nan\x18\x03 \x01(\x08H\x00R\x03nanB\x07\n\x05value\"p\n\x0cNumericGroup\x12.\n\x05owner\x18\x01 \x01(\x0b\x32\x18.typedb.protocol.ConceptR\x05owner\x12\x30\n\x06number\x18\x02 \x01(\x0b\x32\x18.typedb.protocol.NumericR\x06numberB*\n\x1b\x63om.vaticle.typedb.protocolB\x0b\x41nswerProtob\x06proto3')
  ,
  dependencies=[common_dot_concept__pb2.DESCRIPTOR,])




_CONCEPTMAP_MAPENTRY = _descriptor.Descriptor(
  name='MapEntry',
  full_name='typedb.protocol.ConceptMap.MapEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='typedb.protocol.ConceptMap.MapEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='key', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='typedb.protocol.ConceptMap.MapEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='value', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=200,
  serialized_end=280,
)

_CONCEPTMAP = _descriptor.Descriptor(
  name='ConceptMap',
  full_name='typedb.protocol.ConceptMap',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='map', full_name='typedb.protocol.ConceptMap.map', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='map', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='explainables', full_name='typedb.protocol.ConceptMap.explainables', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='explainables', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_CONCEPTMAP_MAPENTRY, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=63,
  serialized_end=280,
)


_EXPLAINABLES_RELATIONSENTRY = _descriptor.Descriptor(
  name='RelationsEntry',
  full_name='typedb.protocol.Explainables.RelationsEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='typedb.protocol.Explainables.RelationsEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='key', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='typedb.protocol.Explainables.RelationsEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='value', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=533,
  serialized_end=623,
)

_EXPLAINABLES_ATTRIBUTESENTRY = _descriptor.Descriptor(
  name='AttributesEntry',
  full_name='typedb.protocol.Explainables.AttributesEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='typedb.protocol.Explainables.AttributesEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='key', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='typedb.protocol.Explainables.AttributesEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='value', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=625,
  serialized_end=716,
)

_EXPLAINABLES_OWNERSHIPSENTRY = _descriptor.Descriptor(
  name='OwnershipsEntry',
  full_name='typedb.protocol.Explainables.OwnershipsEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='typedb.protocol.Explainables.OwnershipsEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='key', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='typedb.protocol.Explainables.OwnershipsEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='value', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=718,
  serialized_end=816,
)

_EXPLAINABLES_OWNED_OWNEDENTRY = _descriptor.Descriptor(
  name='OwnedEntry',
  full_name='typedb.protocol.Explainables.Owned.OwnedEntry',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='key', full_name='typedb.protocol.Explainables.Owned.OwnedEntry.key', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='key', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='value', full_name='typedb.protocol.Explainables.Owned.OwnedEntry.value', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='value', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=_b('8\001'),
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=898,
  serialized_end=984,
)

_EXPLAINABLES_OWNED = _descriptor.Descriptor(
  name='Owned',
  full_name='typedb.protocol.Explainables.Owned',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='owned', full_name='typedb.protocol.Explainables.Owned.owned', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='owned', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_EXPLAINABLES_OWNED_OWNEDENTRY, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=819,
  serialized_end=984,
)

_EXPLAINABLES = _descriptor.Descriptor(
  name='Explainables',
  full_name='typedb.protocol.Explainables',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='relations', full_name='typedb.protocol.Explainables.relations', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='relations', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='attributes', full_name='typedb.protocol.Explainables.attributes', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='attributes', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='ownerships', full_name='typedb.protocol.Explainables.ownerships', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='ownerships', file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_EXPLAINABLES_RELATIONSENTRY, _EXPLAINABLES_ATTRIBUTESENTRY, _EXPLAINABLES_OWNERSHIPSENTRY, _EXPLAINABLES_OWNED, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=283,
  serialized_end=984,
)


_EXPLAINABLE = _descriptor.Descriptor(
  name='Explainable',
  full_name='typedb.protocol.Explainable',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='conjunction', full_name='typedb.protocol.Explainable.conjunction', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='conjunction', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='id', full_name='typedb.protocol.Explainable.id', index=1,
      number=2, type=3, cpp_type=2, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='id', file=DESCRIPTOR),
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
  serialized_start=986,
  serialized_end=1049,
)


_CONCEPTMAPGROUP = _descriptor.Descriptor(
  name='ConceptMapGroup',
  full_name='typedb.protocol.ConceptMapGroup',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='owner', full_name='typedb.protocol.ConceptMapGroup.owner', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='owner', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='concept_maps', full_name='typedb.protocol.ConceptMapGroup.concept_maps', index=1,
      number=2, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='conceptMaps', file=DESCRIPTOR),
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
  serialized_start=1052,
  serialized_end=1181,
)


_NUMERIC = _descriptor.Descriptor(
  name='Numeric',
  full_name='typedb.protocol.Numeric',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='long_value', full_name='typedb.protocol.Numeric.long_value', index=0,
      number=1, type=3, cpp_type=2, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='longValue', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='double_value', full_name='typedb.protocol.Numeric.double_value', index=1,
      number=2, type=1, cpp_type=5, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='doubleValue', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='nan', full_name='typedb.protocol.Numeric.nan', index=2,
      number=3, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='nan', file=DESCRIPTOR),
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
    _descriptor.OneofDescriptor(
      name='value', full_name='typedb.protocol.Numeric.value',
      index=0, containing_type=None, fields=[]),
  ],
  serialized_start=1183,
  serialized_end=1291,
)


_NUMERICGROUP = _descriptor.Descriptor(
  name='NumericGroup',
  full_name='typedb.protocol.NumericGroup',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='owner', full_name='typedb.protocol.NumericGroup.owner', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='owner', file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='number', full_name='typedb.protocol.NumericGroup.number', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, json_name='number', file=DESCRIPTOR),
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
  serialized_start=1293,
  serialized_end=1405,
)

_CONCEPTMAP_MAPENTRY.fields_by_name['value'].message_type = common_dot_concept__pb2._CONCEPT
_CONCEPTMAP_MAPENTRY.containing_type = _CONCEPTMAP
_CONCEPTMAP.fields_by_name['map'].message_type = _CONCEPTMAP_MAPENTRY
_CONCEPTMAP.fields_by_name['explainables'].message_type = _EXPLAINABLES
_EXPLAINABLES_RELATIONSENTRY.fields_by_name['value'].message_type = _EXPLAINABLE
_EXPLAINABLES_RELATIONSENTRY.containing_type = _EXPLAINABLES
_EXPLAINABLES_ATTRIBUTESENTRY.fields_by_name['value'].message_type = _EXPLAINABLE
_EXPLAINABLES_ATTRIBUTESENTRY.containing_type = _EXPLAINABLES
_EXPLAINABLES_OWNERSHIPSENTRY.fields_by_name['value'].message_type = _EXPLAINABLES_OWNED
_EXPLAINABLES_OWNERSHIPSENTRY.containing_type = _EXPLAINABLES
_EXPLAINABLES_OWNED_OWNEDENTRY.fields_by_name['value'].message_type = _EXPLAINABLE
_EXPLAINABLES_OWNED_OWNEDENTRY.containing_type = _EXPLAINABLES_OWNED
_EXPLAINABLES_OWNED.fields_by_name['owned'].message_type = _EXPLAINABLES_OWNED_OWNEDENTRY
_EXPLAINABLES_OWNED.containing_type = _EXPLAINABLES
_EXPLAINABLES.fields_by_name['relations'].message_type = _EXPLAINABLES_RELATIONSENTRY
_EXPLAINABLES.fields_by_name['attributes'].message_type = _EXPLAINABLES_ATTRIBUTESENTRY
_EXPLAINABLES.fields_by_name['ownerships'].message_type = _EXPLAINABLES_OWNERSHIPSENTRY
_CONCEPTMAPGROUP.fields_by_name['owner'].message_type = common_dot_concept__pb2._CONCEPT
_CONCEPTMAPGROUP.fields_by_name['concept_maps'].message_type = _CONCEPTMAP
_NUMERIC.oneofs_by_name['value'].fields.append(
  _NUMERIC.fields_by_name['long_value'])
_NUMERIC.fields_by_name['long_value'].containing_oneof = _NUMERIC.oneofs_by_name['value']
_NUMERIC.oneofs_by_name['value'].fields.append(
  _NUMERIC.fields_by_name['double_value'])
_NUMERIC.fields_by_name['double_value'].containing_oneof = _NUMERIC.oneofs_by_name['value']
_NUMERIC.oneofs_by_name['value'].fields.append(
  _NUMERIC.fields_by_name['nan'])
_NUMERIC.fields_by_name['nan'].containing_oneof = _NUMERIC.oneofs_by_name['value']
_NUMERICGROUP.fields_by_name['owner'].message_type = common_dot_concept__pb2._CONCEPT
_NUMERICGROUP.fields_by_name['number'].message_type = _NUMERIC
DESCRIPTOR.message_types_by_name['ConceptMap'] = _CONCEPTMAP
DESCRIPTOR.message_types_by_name['Explainables'] = _EXPLAINABLES
DESCRIPTOR.message_types_by_name['Explainable'] = _EXPLAINABLE
DESCRIPTOR.message_types_by_name['ConceptMapGroup'] = _CONCEPTMAPGROUP
DESCRIPTOR.message_types_by_name['Numeric'] = _NUMERIC
DESCRIPTOR.message_types_by_name['NumericGroup'] = _NUMERICGROUP
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

ConceptMap = _reflection.GeneratedProtocolMessageType('ConceptMap', (_message.Message,), dict(

  MapEntry = _reflection.GeneratedProtocolMessageType('MapEntry', (_message.Message,), dict(
    DESCRIPTOR = _CONCEPTMAP_MAPENTRY,
    __module__ = 'common.answer_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.ConceptMap.MapEntry)
    ))
  ,
  DESCRIPTOR = _CONCEPTMAP,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.ConceptMap)
  ))
_sym_db.RegisterMessage(ConceptMap)
_sym_db.RegisterMessage(ConceptMap.MapEntry)

Explainables = _reflection.GeneratedProtocolMessageType('Explainables', (_message.Message,), dict(

  RelationsEntry = _reflection.GeneratedProtocolMessageType('RelationsEntry', (_message.Message,), dict(
    DESCRIPTOR = _EXPLAINABLES_RELATIONSENTRY,
    __module__ = 'common.answer_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables.RelationsEntry)
    ))
  ,

  AttributesEntry = _reflection.GeneratedProtocolMessageType('AttributesEntry', (_message.Message,), dict(
    DESCRIPTOR = _EXPLAINABLES_ATTRIBUTESENTRY,
    __module__ = 'common.answer_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables.AttributesEntry)
    ))
  ,

  OwnershipsEntry = _reflection.GeneratedProtocolMessageType('OwnershipsEntry', (_message.Message,), dict(
    DESCRIPTOR = _EXPLAINABLES_OWNERSHIPSENTRY,
    __module__ = 'common.answer_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables.OwnershipsEntry)
    ))
  ,

  Owned = _reflection.GeneratedProtocolMessageType('Owned', (_message.Message,), dict(

    OwnedEntry = _reflection.GeneratedProtocolMessageType('OwnedEntry', (_message.Message,), dict(
      DESCRIPTOR = _EXPLAINABLES_OWNED_OWNEDENTRY,
      __module__ = 'common.answer_pb2'
      # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables.Owned.OwnedEntry)
      ))
    ,
    DESCRIPTOR = _EXPLAINABLES_OWNED,
    __module__ = 'common.answer_pb2'
    # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables.Owned)
    ))
  ,
  DESCRIPTOR = _EXPLAINABLES,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.Explainables)
  ))
_sym_db.RegisterMessage(Explainables)
_sym_db.RegisterMessage(Explainables.RelationsEntry)
_sym_db.RegisterMessage(Explainables.AttributesEntry)
_sym_db.RegisterMessage(Explainables.OwnershipsEntry)
_sym_db.RegisterMessage(Explainables.Owned)
_sym_db.RegisterMessage(Explainables.Owned.OwnedEntry)

Explainable = _reflection.GeneratedProtocolMessageType('Explainable', (_message.Message,), dict(
  DESCRIPTOR = _EXPLAINABLE,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.Explainable)
  ))
_sym_db.RegisterMessage(Explainable)

ConceptMapGroup = _reflection.GeneratedProtocolMessageType('ConceptMapGroup', (_message.Message,), dict(
  DESCRIPTOR = _CONCEPTMAPGROUP,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.ConceptMapGroup)
  ))
_sym_db.RegisterMessage(ConceptMapGroup)

Numeric = _reflection.GeneratedProtocolMessageType('Numeric', (_message.Message,), dict(
  DESCRIPTOR = _NUMERIC,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.Numeric)
  ))
_sym_db.RegisterMessage(Numeric)

NumericGroup = _reflection.GeneratedProtocolMessageType('NumericGroup', (_message.Message,), dict(
  DESCRIPTOR = _NUMERICGROUP,
  __module__ = 'common.answer_pb2'
  # @@protoc_insertion_point(class_scope:typedb.protocol.NumericGroup)
  ))
_sym_db.RegisterMessage(NumericGroup)


DESCRIPTOR._options = None
_CONCEPTMAP_MAPENTRY._options = None
_EXPLAINABLES_RELATIONSENTRY._options = None
_EXPLAINABLES_ATTRIBUTESENTRY._options = None
_EXPLAINABLES_OWNERSHIPSENTRY._options = None
_EXPLAINABLES_OWNED_OWNEDENTRY._options = None
# @@protoc_insertion_point(module_scope)