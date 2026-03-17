export const tasks = {
    getTasks: `
        SELECT * 
        FROM tasks 
        WHERE team_id = $1
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
            assigned_to = COALESCE(NULLIF($4::text, '')::integer, assigned_to),
            team_id = COALESCE(NULLIF($5::text, '')::integer, team_id)
        WHERE id = $6 RETURNING *   
    `,
    deleteTask: `
        DELETE FROM tasks WHERE id = $1 RETURNING *   
    `
}