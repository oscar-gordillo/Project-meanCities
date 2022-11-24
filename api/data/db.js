const mongoose= require("mongoose");
require("./cities-model");
require("./users-model");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function() {
    console.log(process.env.MONGOOSE_CONN_MESSAGE+ process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function() {
    console.log(process.env.MONGOOSE_DISCONN_MESSAGE);
});
mongoose.connection.on("error", function(err) {
    console.log(process.env.MONGOOSE_CONN_ERROR_MESSAGE+ err);
});
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});
process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});
process.once("SIGUSR2", function() {    
    mongoose.connection.close(function() {
    console.log(process.env.SIGUSR2_MESSAGE);
    process.kill(process.pid, "SIGUSR2");
    });
});