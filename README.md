Check if ingress is working
kubectl get pods -n ingress-nginx 

kubectl get svc -n ingress-nginx 

kubectl port-forward --address 0.0.0.0 -n ingress-nginx svc/ingress-nginx-controller 8080:80



To check if frontend can communicate with backend,

kubectl get pods

kubectl exec -it <frontend-pod-name> -- bash

curl http://backend-service:8000

---

To check if backend can communicate with postgres, 

kubectl exec -it <backend-pod-name> -- python manage.py shell

Python 3.12.13 (main, May 19 2026, 23:48:44) [GCC 14.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from django.db import connection
>>> connection.ensure_connection()
>>> print("Connected!")

if it shows Connected, then backend can communicate with postgres.
