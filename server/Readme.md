````markdown
## Development Setup and Dependency Management

### Why rebuild the Docker image after installing new npm packages?

Docker images are immutable snapshots of your app and dependencies. Installing packages inside a running container is temporary and lost on restart or rebuild.

### Correct workflow to add a new npm package:

1. Navigate to your project folder on the host machine (e.g., `./api`):

   ```bash
   cd ./api
````

2. Install the package and save it to `package.json`:

   ```bash
   npm install <package-name> --save
   ```

3. Confirm `package.json` and `package-lock.json` are updated.

4. Rebuild the Docker image to include new dependencies:

   ```bash
   docker-compose build api
   ```

5. Restart the container to apply changes:

   ```bash
   docker-compose up -d api
   ```

6. (Optional) Verify the container is running:

   ```bash
   docker ps
   ```

7. To stop containers when needed:

   ```bash
   docker-compose down
   ```

---

 8. to go to sgekk
  docker exec -it dating-api bash