regenerate: 
	npm run codegen
	graph build --network localhost
	npm run remove-local
	npm run create-local
	npm run deploy-local

sub:
	npm run remove-local
	npm run create-local
	npm run deploy-local

# To launch these commands, you need first to auth with the graph-cli and the subgraph
## Mumbai hosted subgraph: https://thegraph.com/hosted-service/subgraph/beetogether/beetogether-mumbai
deploy-mumbai: 
	graph codegen
	graph build --network mumbai
	graph deploy --product hosted-service beetogether/beetogether-mumbai

## Mumbai hosted subgraph: https://thegraph.com/hosted-service/subgraph/beetogether/beetogether-polygon
deploy-polygon: 
	graph codegen
	graph build --network polygon
	graph deploy --product hosted-service beetogether/beetogether-polygon

deploy-zksync: 
	graph codegen
	graph build --network zkSync2-testnet
	graph auth --product hosted-service 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
	graph deploy --product hosted-service mattiapomelli/beetogether-zksync