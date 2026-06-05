All the files required to run this app is in kubernetes-files.



This instruction involves running the application using Gateway API instead of ingress-nginx.

Step 1: Install the Gateway API CRDs


First, install the Gateway API Custom Resource Definitions (CRDs) in our cluster:

`kubectl apply -f

https://github.com/kubernetes-sigs/gateway-api/releases/latest/download/standard-install.yaml`

Verify the installation:

`kubectl get crds | grep gateway`



Step 2: Deploy a Gateway Controller

The Gateway API doesn’t come with a built-in controller. You can use an existing one like Istio, Kong, or Envoy Gateway. For example, to install the Istio Gateway Controller, run:

`istioctl install –set profile=default

kubectl apply -f

https://github.com/istio/istio/releases/latest/download/gateway.yaml`



Step 3: Define a GatewayClass

The GatewayClass defines how gateways should behave, similar to an IngressClass.

```
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: my-gateway-class
spec:
  controllerName: istio.io/gateway-controller
```

Apply it:

`kubectl apply -f gatewayclass.yaml`



Step 4: Create a Gateway

The Gateway is the actual network entry point handling traffic.


```
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-ecommerce-gateway
spec:
  gatewayClassName: my-gateway-class
  listeners:
  - name: http
    protocol: HTTP
    port: 80
```


Apply it:

`kubectl apply -f gateway.yaml`


Step 5: Define HTTP Routes

Routes define how incoming requests are forwarded to backend services.

Routes define how incoming requests are forwarded to backend services.

```
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: frontend-to-backend
spec:
  parentRefs:
  - name: my-ecommerce-gateway
  hostnames: 
  - myapp.com
  - matches:
    - path:
        type: PathPrefix
        value: "/api"
    backendRefs:
    - name: backend-service
      port: 8080

  - matches:
    - path:
        type: PathPrefix
        value: "/static/admin"
    backendRefs:
    - name: backend-service
      port: 8080

  - matches:
    - path:
        type: PathPrefix
        value: "/static/rest_framework"
    backendRefs:
    - name: backend-service
      port: 8080

  - matches:
    - path:
        type: PathPrefix
        value: "/"
    backendRefs:
    - name: frontend-service
      port: 80
    
```

Apply it:

`kubectl apply -f httproute.yaml`


Step 6: Deploy Frontend and Backend Services

For simplicity, deploy a basic frontend and backend.

Frontend Service:

```
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```



Backend Service:

```
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```




Apply both:

```
kubectl apply -f frontend-service.yaml
kubectl apply -f backend-service.yaml
```


Step 7: Test the Setup

Retrieve the external IP of your Gateway:

```
kubectl get gateway my-ecommerce-gateway
kubectl get gateway my-ecommerce-gateway
```


Send a request:

```
curl http://<GATEWAY-IP>/api
```
