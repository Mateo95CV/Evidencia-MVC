export const tasks = {
    getTasks: `
        SELECT * FROM tasks
    `,
    postTask: `
        INSERT INTO tasks (title, description, status, assigned_to, team_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *   
    `,
    putTask: `
        UPDATE tasks 
        SET 
            title = COALESCE(NULLIF($1, ''), title),
            description = COALESCE(NULLIF($2, ''), description),
            status = COALESCE(NULLIF($3, ''), status),
            assigned_to = COALESCE(NULLIF($4, ''), assigned_to),
            team_id = COALESCE(NULLIF($5, ''), team_id)
        WHERE id = $6 RETURNING *   
    `,
    deleteTask: `
        DELETE FROM tasks WHERE id = $1 RETURNING *   
    `
}