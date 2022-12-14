import graphene


class FilterValueType(graphene.ObjectType):
    name = graphene.String(required=True)
    value = graphene.String(required=True)


class FilterTypeType(graphene.Enum):
    CHECKBOX = 'checkbox'
    DATE = 'date'


class FilterType(graphene.ObjectType):
    name = graphene.String(required=True)
    type = FilterTypeType(required=True)
    slug = graphene.String(required=True)
    values = graphene.List(graphene.NonNull(FilterValueType), required=True)

    class Meta:
        interfaces = (graphene.relay.Node, )


FilterListType = graphene.List(graphene.NonNull(FilterType))
