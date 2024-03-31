import typesense
from pprint import pprint

client = typesense.Client({
  'nodes': [{
    'host': 'localhost', # For Typesense Cloud use xxx.a1.typesense.net
    'port': '8108',      # For Typesense Cloud use 443
    'protocol': 'http'   # For Typesense Cloud use https
  }],
  'api_key': 'sahilcoder1',
  'connection_timeout_seconds': 2
})

# inventory = {
#   'name': 'inventory',
#   'fields': [
#     {'name': 'name', 'type': 'string' },
#     {'name': 'descrip', 'type': 'string', 'facet': True },
#     {'name': 'type', 'type': 'string', 'facet': True},
#     {"name": "cover", "type": "string"},
#     {"name": "category", "type": "string*"}
#  ]
# }

# #client.collections['inventory'].delete()
# client.collections.create(inventory)
# #pprint(client.collections['inventory'].documents.export())

# search_parameters = {
#   'q'         : '',
#   'query_by'  : 'name',
# }

#pprint(client.collections['inventory'].documents.search(search_parameters))
# pprint(client.keys.create({
#  "description": "Search-only inventory key.",
#  "actions": ["documents:search"],
#  "collections": ["inventory"]
# }))
pprint(client.keys.create({
 "description": "Admin key.",
 "actions": ["*"],
  "collections": ["*"]
}))
#pprint(client.keys.retrieve())
#client.collections['inventory'].delete()



