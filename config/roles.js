const allRoles = {
    employee: ['read', 'create', 'update'],
    admin: ['create', 'read', 'update', 'delete'],
  };
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  module.exports = {
    roles,
    roleRights,
  };
  