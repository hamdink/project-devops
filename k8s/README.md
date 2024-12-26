# Instructions

## Create the Secret

```sh
kubectl apply -f mongo-secret.yaml
```

## Apply the deployments and services

```sh
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f db-deployment.yaml
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f grafana-deployment.yaml
```
