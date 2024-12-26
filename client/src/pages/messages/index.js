import React from 'react';
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';
import TableContact from 'src/views/tables/TableContacts';

const UserManagementPage = () => {
  return (
    <RequireAdmin>

      <TableContact />

    </RequireAdmin>
  );
}

export default UserManagementPage;
