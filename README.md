<a name="readme-top"></a>

# GoHiking &#x26FA;

<div align="center">

![GoHiking Screenshot][GoHiking-screenshot]

</div>

This is a project to learn and practice full stack web development. Project originated from [Colt Steele's][colt-url] [course](https://www.udemy.com/course/the-web-developer-bootcamp/).

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with-">Built With</a>
    </li>
    <li><a href="#features-">Features</a></li>
    <li>
      <a href="#getting-started-">Getting Started & Running App</a>
    </li>
    <li><a href="#contact-">Contact</a></li>
    <li><a href="#acknowlegements-">Acknowledgments</a></li>
  </ol>
</details>

# Built With &#x1F3D7;

<div align="center">

[![HTML5][HTML-shield]][HTML-url]
[![CSS3][CSS-shield]][CSS-url]
[![JavaScript][JavaScript-shield]][JavaScript-url]
[![Node][Node.js-shield]][Node.js-url]
[![MongoDB][MongoDB-shield]][MongoDB-url]
[![Git][Git-shield]][Git-url]
[![Bootstrap][Bootstrap-shield]][Bootstrap-url]
[![Render][Render-shield]][Render-url]

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Getting Started &#x1F4BB;

### 1. Clone the repo

```
git clone https://github.com/YXShang97/GoHiking.git
```

### 2. Install NPM packages in project directory

```
cd GoHiking
npm install
```

If vulnerabilities are found when packages are installed, run:

```
npm audit fix
```

### 3. Create environment variables

In home directory, create `.env` file with the below environment variables and input your API keys an MongoDB URL if using MongoDB Atlas.

```
# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

# Mapbox credentials
MAPBOX_TOKEN=

# MongoDB credentials
DB_URL=

# Secret key
SECRET=
```

### 4. Create initial database user

Start the app and open the default (http://localhost:3000) to register an initial user.

```
nodemon app.js
```

Open MongoDB Shell (`mongosh`) and run the following commands to retrieve the user's `ObjectID`

```
use hiking-trail
db.users.find()
```

### 5. Seed database

Copy the user's `ObjectID` from above and paste into `seeds/index.js` under author so all of your seeded hikingtrails have an author.

```
node seeds/index.js
```

### 6. Running App &#x1F680;

```
nodemon app.js
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contact &#x2709;

Feel free to reach out!

<div align="center">

[![LinkedIn][LinkedIn-shield]][LinkedIn-url]

</div>

Live Version: https://gohiking2-882a8fb449f2.herokuapp.com/

Project Repo: https://github.com/YXShang97/GoHiking.git

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Acknowlegements &#x1F64C;

Big thanks to [Colt Steele][colt-url] in putting in the time and effort to creating such a robust web dev course.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Links & Images -->

[GoHiking-screenshot]: images/GoHiking_home_page.jpg "Screenshot of GoHiking app"
[colt-url]: https://www.udemy.com/user/coltsteele/
[HTML-shield]: https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS-shield]: https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript-shield]: https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Node.js-shield]: https://img.shields.io/badge/Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[MongoDB-shield]: https://img.shields.io/badge/MongoDB-47a248?style=flat-square&logo=MongoDB&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Git-shield]: https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[Bootstrap-shield]: https://img.shields.io/badge/Boostrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
[Render-shield]: https://img.shields.io/badge/Render-323330?style=flat-square&logo=Render&logoColor=46E3B7
[Render-url]: https://render.com/
[LinkedIn-shield]: https://img.shields.io/badge/LinkedIn-323330?style=for-the-badge&logo=linkedin&logoColor=0077B5
[LinkedIn-url]: https://www.linkedin.com/in/yxshang/
