module.exports = convertRowToUser;


function convertRowToUser( metaData, row ) {
   const user = {};
   metaData.forEach((m, index) => {
      user[m.name.toLowerCase()] = row[index];
   });
   return user;
}