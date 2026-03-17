export const teams = {
    postTeam: `
        INSERT INTO teams (name, createdBy)
        VALUES ($1, $2)
        RETURNING *;
    `,
    postTeamMember: `
        INSERT INTO team_members (teamId, userId)
        VALUES ($1, $2)
        RETURNING *;
    `,
    getTeamMembers: `
        SELECT 
            t.name AS Team,
            u.name AS Member
        FROM teams t
        JOIN team_members tm ON t.id = tm.teamId
        JOIN users u ON tm.userId = u.id
        WHERE t.id = $1;
    `
}