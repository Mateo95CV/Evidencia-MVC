export const users = {
    postUser: `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    getUserByEmail: `
        SELECT * FROM users WHERE email = $1;
    `,
    userCredentials: `
        SELECT email, password 
        FROM users 
        WHERE 
            email = $1 
            AND password = $2;
    `
}