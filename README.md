# AWS CDK + CodePipeline – Assignment 2 (Student ID: 9062297)


The overview of this project is  **AWS CDK (TypeScript)** and **AWS CodePipeline** to automatically deploy AWS infrastructure using a CI/CD pipeline.

The CDK app deploys the following AWS resources:

1. **Amazon S3 Bucket**  
2. **Amazon DynamoDB Table**  
3. **CodePipeline** to automate build → synth → deploy  

---

## 1. Architecture Summary

A simple overview of how everything works:

- Infrastructure is written using **AWS CDK (TypeScript)**.
- CDK stack includes:
  - S3 bucket  
  - DynamoDB table  
- Code is pushed to GitHub.
- **AWS CodePipeline** automatically:
  - Fetches source code
  - Builds using CodeBuild (`npm run build` + `cdk synth`)
  - Deploys CloudFormation using the Deploy stage  

Every git push automatically updates AWS resources.

---

## 2. AWS Resources Created by CDK

### Stack Name: **CdkLabStack**

The following resources are created:

---

### 2.1 S3 Bucket

- **Bucket Name:** `dhruv1-954847476805-cdk-bucket`
- **Purpose:** Store files
- **Configuration:** Simple bucket for assignment requirements

---

### 2.2 DynamoDB Table

- **Table Name:** `MyDyTable_Assignment2_Dhruv`
- **Primary Key:**  
  - `id` (String)
- **Purpose:** Store items using an `id` attribute

---

## 3. Tools & Technologies Used

- **AWS CDK v2 (TypeScript)**
- **Node.js / npm**
- **AWS CodePipeline**
- **AWS CodeBuild**
- **AWS CloudFormation**
- **GitHub**
- **AWS CLI**
- **VS Code**

---

## 4. Local Development & Manual Deployment

### 4.1 Clone Repository
```bash
git clone https://github.com/DhruvPatel-30/AWS-CDK-AWS-CodePipeline-aka-CDK-Pipeline---Assignment-2.git
cd AWS-CDK-AWS-CodePipeline-aka-CDK-Pipeline---Assignment-2
```

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Configure AWS CLI
```bash
aws configure
```
- Region: `us-east-1`
- Output: `json`

Test:
```bash
aws sts get-caller-identity
```

### 4.4 Bootstrap (first time)
```bash
cdk bootstrap
```

### 4.5 Synthesize CloudFormation template
```bash
cdk synth
```

### 4.6 Manual Deploy (optional)
```bash
cdk deploy CdkLabstack
cdk deply PipelineAssignmentStack
```

---

## 5. CI/CD Pipeline Setup

### 5.1 GitHub Repository
Contains:
- CDK TypeScript code  
- **buildspec.yml**

---

### 5.2 buildspec.yml (Required)

```yaml
version: 0.2
phases:
  install:
    commands:
      - npm install -g aws-cdk
      - npm install
  build:
    commands:
      - npm run build
      - cdk synth
artifacts:
  files:
    - '**/*'
```

✔ Deployment is **not** inside CodeBuild  
✔ Deployment is handled by CodePipeline

---

## 5.3 CodeBuild Configuration

- **Build Project Name:** `CdkBuildProject`
- **Buildspec:** Use buildspec.yml from repo
- **Service role:** CodeBuild role with required permissions

---

## 5.4 CodePipeline Stages

### ▶ Stage 1 — **Source**
- Pulls from GitHub using CodeStar connection

### ▶ Stage 2 — **Build**
Runs:
```
npm install
npm run build
cdk synth
```

Outputs: `CdkLabStack.template.json`

### ▶ Stage 3 — **Deploy**
CloudFormation deploys the stack:
- S3 bucket
- DynamoDB table

---

## 6. Testing


Manually insert an item:
```
change some API message for lamda, S3 bucket and  table name and commit it.

---

## 7. Cleanup Confirmation

To remove all resources:

```bash
npx cdk destroy CdkLabStack --force
npx cdk destroy PipelineStack --force
```

 All AWS resources successfully removed  
 No cost-impact services left running  

---




