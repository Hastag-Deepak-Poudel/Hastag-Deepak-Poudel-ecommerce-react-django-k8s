Check if ingress is working
```bash
kubectl get pods -n ingress-nginx 

kubectl get svc -n ingress-nginx 

kubectl port-forward --address 0.0.0.0 -n ingress-nginx svc/ingress-nginx-controller 8080:80

```

Check if frontend-service is working
```bash
kubectl get svc -n <namespace>

kubectl port-forward --address 0.0.0.0 -n <namespace> svc/frontend-service 8081:8080
```

To check if frontend can communicate with backend,
```bash
kubectl get pods

kubectl exec -it <frontend-pod-name> -- bash

curl http://backend-service:8000
```
---

To check if backend can communicate with postgres, 
```python
kubectl exec -it <backend-pod-name> -- python manage.py shell
```
```python
Python 3.12.13 (main) [GCC 14.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from django.db import connection
>>> connection.ensure_connection()
>>> print("Connected!")
```
if it shows Connected, then backend can communicate with postgres.
