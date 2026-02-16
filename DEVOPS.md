AWS EKS End-to-End DevOps Project 🚀
A comprehensive, from-scratch guide to deploying a production-ready microservices architecture. This project covers everything from infrastructure provisioning on AWS to CI/CD automation with GitHub Actions.
🏗️ Architecture OverviewInfrastructure: AWS EC2 (Jump Server), EKS (Kubernetes Cluster), S3 & CloudFront (Frontend).Backend: Node.js API containerized with Docker.Frontend: React.js SPA hosted on S3.IaC: Terraform for resource provisioning.Orchestration: Kubernetes (EKS) using eksctl and kubectl.
🟢Phase 0: PrerequisitesBefore starting, ensure you have:An AWS Account (Free Tier is sufficient).A GitHub Account.A local terminal (Linux/Mac/Windows WSL2).
🟢 Phase 1: The DevOps Jump ServerWe use a single EC2 instance as our management hub for Terraform, Docker, and Kubernetes tools.Step 1: Launch InstanceSettingValueNamedevops-masterAMIUbuntu 22.04Instance Typet2.medium (Minimum requirement for EKS tools)Storage20 GBSecurity GroupAllow SSH (22)Step 2: ConnectBashssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
🟢 Phase 2: Toolchain InstallationRun these commands on your devops-master instance:1. AWS CLI & DockerBashsudo apt update && sudo apt upgrade -y
sudo apt install awscli docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker
aws configure
2. Kubernetes Tools (kubectl & eksctl)Bash# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/

# eksctl
curl -sLO "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz"
tar -xzf eksctl_Linux_amd64.tar.gz && sudo mv eksctl /usr/local/bin/
3. TerraformBashwget https://releases.hashicorp.com/terraform/1.6.6/terraform_1.6.6_linux_amd64.zip
unzip terraform_1.6.6_linux_amd64.zip && sudo mv terraform /usr/local/bin/
🟢 Phase 3: Application DevelopmentBackend (Node.js)Located in /backend.API: Express.js server on port 3000.Health Check: /health endpoint.Dockerization: Multi-stage builds for optimization.Frontend (React)Located in /frontend.Builds static assets via npm run build.Deployed to AWS S3 and accelerated by CloudFront.
🟢 Phase 4: Infrastructure & Deployment1. Create EKS ClusterBasheksctl create cluster \
--name devops-cluster \
--region ap-south-1 \
--nodegroup-name devops-nodes \
--node-type t3.medium \
--nodes 2
Note: This process takes approximately 15 minutes.2. Kubernetes DeploymentDeploy the backend using the manifest in /k8s/backend.yaml:Bashkubectl apply -f k8s/backend.yaml
kubectl get svc  # Get the LoadBalancer URL
🟢 Phase 5: CI/CD (GitHub Actions)The repository includes workflows for:Backend Pipeline: Docker Build -> Push to DockerHub -> Update EKS Deployment.Frontend Pipeline: Build React -> Sync to S3 -> Invalidate CloudFront Cache.📂 Project StructurePlaintext.
├── .github/workflows/   # CI/CD Pipelines
├── backend/             # Node.js API & Dockerfile
├── frontend/            # React App & S3 Config
├── k8s/                 # Kubernetes Manifests (YAML)
└── terraform/           # IaC for VPC, EKS, and S3
