
# React-Flask-MySQL App with Nginx Proxy Server

![alt text](<WhatsApp Image 2024-06-12 at 23.58.15_05236b57.jpg>)

## Project Setup

This project leverages a powerful trio: React for the interactive frontend, Flask for the backend API, and Nginx as the versatile web server and reverse proxy.

### Frontend (React App)

* Create a React application using your preferred method (e.g., `create-react-app`).
* Build the production-ready React app using `npm run build` or `yarn build` (commands may vary depending on your setup).

### Backend (Flask App)

* Develop your Flask API endpoints to handle data processing, database interactions, or any other backend logic.
* Ensure the Flask app runs on a designated port (e.g., `5000`).

### Reverse Proxy (Nginx)

* Install Nginx on your server.
* Configure Nginx to:
    - Serve the static files of your built React app from the appropriate directory (typically the `build` folder).
    - Act as a reverse proxy for Flask API requests:
        - Forward requests to the Flask app running on a different port (e.g., `http://localhost:5000`).
        - Handle routing for API endpoints (consider using appropriate URL prefixes for clarity).

**Default React App Display**

* In your Nginx configuration, set up a `location /` block to:
    - Use the `try_files` directive to attempt to serve the requested file from the React app's static directory first.
    - If the file is not found, fallback to serving the `index.html` file, which typically serves as the entry point for your React app.

**Example Nginx Configuration (replace paths accordingly):**

```nginx
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {    
        listen       80;
        server_name  localhost;

        location / {
            root   C:/Users/minha/Desktop/Dump/React-flask-mysql-app/react-app/build;
            index  index.html index.htm;
            try_files $uri /index.html;
        }

        location /api/ {
            proxy_pass http://localhost:5000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

## Testing and Deployment

![alt text](<WhatsApp Image 2024-06-13 at 00.02.43_15076285.jpg>)

* Start your services (React in development mode, Flask, and Nginx).
* Access your application URL in the browser (e.g., `http://localhost`). You should see your React app rendered.
* Test API endpoints using tools like Postman or browser developer tools, making requests to your Nginx server's API URL prefix (e.g., `http://localhost/api/your-endpoint`).

## Additional Considerations

* For production deployment, consult resources on deploying React, Flask, and Nginx to your specific hosting environment. This may involve process management tools like `systemd` or containerization with Docker.
* Implement security measures like proper authentication and authorization for your Flask API, especially when deploying to a public-facing server.
* Consider error handling and logging for both React and Flask to aid in debugging and monitoring.

By following these steps and adapting them to your specific project structure, you can effectively set up your React app to communicate with your Flask backend through Nginx as a reverse proxy, ensuring a seamless user experience.