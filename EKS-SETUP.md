THIS IS TO SETUP TO RUN OUR APP ON EKS KUBERNETES SERVICE.

AT FIRST YOU NEED TO CREATE A CLUSTER IN AWS.

THERE ARE 3 WAYS TO CREATE EKS CLUSTER. THEY ARE:

	1. TO CREATE MANUALLY BY USING AWS DASHBOARD WHICH WILL creating vpc, creating private and public subnet, attaching our vpc with internet gateway, creating roles, permissions and 
		policies and attaching to our kubernetes cluster. such as creating, deleting and modifying policies and roles to use our cluster.


	2. BY CREATING FROM OUR HOST TERMINAL. TO DO THAT, REFER,
	https://medium.com/@muppedaanvesh/hands-on-guide-to-creating-an-amazon-eks-cluster-with-self-managed-worker-nodes-fad026c34482

	3. AND THE MOST SIMPLE WAY IS BY USING TERRAFORM,

		- install terraform
		- go to terraform directory
		- run 
			terraform init
			terraform plan
			terraform apply

		PS. It is the possible to run our app in the eks cluster using our free-tier account because the resources available for free-tier is not enough to run the app smoothly.

When the cluster is created, 

run this in terminal,

	aws eks --region <Region-Name> update-kubeconfig --name <Cluster-Name>

example:
	aws eks --region ap-south-1 update-kubeconfig --name my-own-cluster

to use the cluster using kubectl,
 
run 
	kubectl config get-clusters

then something like this will show up:

NAME
kind-kind
arn:aws:eks:ap-south-1:174376948089:cluster/my-own-cluster

then to use the cluster, run

	kubectl config use-context arn:aws:eks:ap-south-1:174376948089:cluster/my-own-cluster 

thus you are connected to your eks cluster.


At first install ingress-gateway controller inside you cluster so that the controller can traffic handling, Ingress rules and routing, ssl/tls handling, loadbalancing, health checks and custom freatures.

	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.48.1/deploy/static/provider/baremetal/deploy.yaml



then go in the kubernetes directory and apply all the files using kubectl.


After you are done experimenting around, 

	1. Delete all the resources you have applied
	2. run terraform destroy
	3. run kubectl config delete-cluster arn:aws:eks:ap-south-1:174376948089:cluster/my-own-cluster 
