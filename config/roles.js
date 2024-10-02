const allRoles = {
  employee: ['read', 'createL','create', 'update'],
  admin: ['create', 'read', 'update', 'delete','judge','createEmp'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
