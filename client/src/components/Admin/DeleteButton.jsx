import { DeleteOutlined } from '@ant-design/icons';
import { useApi } from '../../context/api';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

const DeleteButton = ({ route, id, item, onDeleteSuccess }) => {
    const { URI } = useApi();
    const { auth } = useAuth();

    const handleDelete = useCallback(async () => {
        try {
            await axios.patch(`${URI}/api/v1/${route}/${id}`, {}, {
                headers: {
                    Authorization: auth?.access_token,
                },
            });

            toast.success(`${item} deleted successfully`);

            onDeleteSuccess();
        } catch (err) {
            console.error(err);
            toast.error(`Error deleting ${item}`);
        }
    }, [URI, auth?.access_token, route, id, item, toast, onDeleteSuccess]);

    return (
        <b
            className={`text-xl cursor-pointer hover:text-red-100`}
            onClick={handleDelete}
        >
            <DeleteOutlined />
        </b>
    );
};

export default DeleteButton;
