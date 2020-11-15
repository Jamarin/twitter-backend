db.createUser({
    user: "tweet",
    pwd: "tweet",
    roles: [{
        role: "readWrite",
        db: "twitter"
    }]
});