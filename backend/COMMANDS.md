
### 2. **Using `COMMANDS.md`**

If you want a dedicated file for listing all the commands, you can create a `COMMANDS.md` file.

Example `COMMANDS.md`:
```markdown
# Common Commands

## Server Commands

- **Install Dependencies**: `npm install`
- **Start Server (Development)**: `npm run dev`
- **Start Server (Production)**: `npm start`

## Database Commands

- **Run Migrations**: `npx sequelize-cli db:migrate`
- **Undo Last Migration**: `npx sequelize-cli db:migrate:undo`
- **Run Seeders**: `npx sequelize-cli db:seed:all`
- **Undo Seeders**: `npx sequelize-cli db:seed:undo`

## Other Useful Commands

- **Lint Code**: `npm run lint`
- **Run Tests**: `npm test`
