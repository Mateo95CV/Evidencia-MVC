export const teams = {
    getTeams: `
        SELECT * FROM teams;
    `,
    postTeam: `
        INSERT INTO teams (name, created_by)
        VALUES ($1, $2)
        RETURNING *;
    `,
    postTeamMember: `
        INSERT INTO team_members (user_id,team_id)
        VALUES ($1, $2)
        RETURNING *;
    `,
    getTeamMembers: `
        SELECT 
            t.name AS Team,
            u.name AS Member
        FROM teams t
        JOIN team_members tm ON t.id = tm.team_id
        JOIN users u ON tm.user_id = u.id
        WHERE t.id = $1;
    `
}