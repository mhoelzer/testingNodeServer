const Sequilize = require('sequelize');
// make sure the workoutlogTesting part matches cause thats what its labeled as in the postgres
const sequelize = new Sequilize('workoutlogTesting', 'postgres', 'Seaottercrow90:)', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('connected to workout log postgres db');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;