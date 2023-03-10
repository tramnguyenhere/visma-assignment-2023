# Solution for Visma Programming Assignment - Summer Trainee 2023: Software Developer

Author: Tram Nguyen

## Problem:

Visma Solutions Oy is developing an application for identity management. With the application, users can login to integrated applications, confirm payments and sign documents. Identity management is a mobile application, and other apps can call its services through deep linking. When this is used, the identity management application would open automatically from the right in-app location. In this assignment, you will be implementing a part of this logic.

## How to run the code

### Install NodeJs and npm

1. Download and install Node.js from this link https://nodejs.org/en/download/

### Clone this repo.

2. On your terminal, run: `git clone https://github.com/tramnguyenhere/visma-assignment-2023.git`
3. On your terminal, navigate to root directory and install by running: `npm install`

### Run the code

4. Open the file src/requestURI.ts, replace the available value of the variable "uri" to your own value
5. On your terminal, run: `npm run build`
6. From the root directory, navigate to `dist` directory by running: `cd dist`
7. On your terminal, run: `node index`

(! Ensure to run `node index` only when you are in 'dist' directory)

Example:
Output for Valid request\
![Screenshot 2023-01-26 at 22 52 29](https://user-images.githubusercontent.com/57455557/214948027-0e025e4c-b451-4648-aef8-eebbd13b1cd3.png) \
Output for Invalid request\
![Screenshot 2023-01-26 at 22 53 14](https://user-images.githubusercontent.com/57455557/214948175-69748b40-d77b-416c-8596-d1da4b964678.png)


## Understanding of the problem

### Understanding:

The problem requires us to write a class that can be used to either validate the request and identify what kind of requests it receives. The invalid conditions are defined when:

1. The scheme does not equal "visma-identity".
2. The parameters do not satisfy the requirements of the path.
3. There are typos in the request.

When the request is determined as valid, the function will return an object that includes path and parameters as key pair values. Otherwise, error message would be returned.

### Challenges:

- I rarely use class in my coding experience so I had to look through some documentations during implementation.
- I had experienced with Regex before but not as complicated as I implemented it this time.

### Improvements:

- The assignment could be extended which includes frontend development of client's input for a clearer demonstration.
- The comments could be improved since I believe some of them could be too obvious but at the same time I want to ensure every line understandable.
