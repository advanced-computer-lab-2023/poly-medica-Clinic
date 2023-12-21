import { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newAdminUsername, setNewAdminUsername] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState('');
    const [addAdmin, setAddAdmin] = useState(false);
    const [removeAdmin, setRemoveAdmin] = useState(false);
    const [adminIsBeingAdded, setAdminIsBeingAdded] = useState(false);
    const [adminIsBeingDeleted, setAdminIsBeingDeleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const contextValue = {
        admins, setAdmins, isLoading, setIsLoading, openAddDialog, setOpenAddDialog, newAdminEmail,
        newAdminPassword, newAdminUsername, setNewAdminEmail,
        setNewAdminPassword, setNewAdminUsername, confirmDeleteDialogOpen, setConfirmDeleteDialogOpen,
        adminToDelete, setAdminToDelete, addAdmin, setAddAdmin, removeAdmin, setRemoveAdmin,
        adminIsBeingAdded, setAdminIsBeingAdded, adminIsBeingDeleted, setAdminIsBeingDeleted,
        errorMessage, setErrorMessage, selectedAdmin, setSelectedAdmin, strength, setStrength,
        level, setLevel
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;