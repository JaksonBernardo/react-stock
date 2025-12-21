import { MdEdit, MdDelete, MdFactory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SupplierItem = (props) => {

    const navigate = useNavigate();

    const navigateSupplier = (supplierId, option) => {
        navigate(
            option === "edit"
                ? `/dashboard/suppliers/edit/${supplierId}`
                : `/dashboard/suppliers/delete/${supplierId}`
        );
    };

    return (
        <>
            <tr>
                <td>{props.name}</td>
                <td>{props.cnpj}</td>
                <td>{props.email}</td>
                <td>{props.address}</td>
                <td>{props.whatsapp}</td>
                <td className="actions">
                    <button className="btn-action edit" onClick={(e) => { e.stopPropagation(); navigateSupplier(props.id, "edit") }}>
                        <MdEdit size={15} />
                    </button>
                    <button className="btn-action delete" onClick={(e) => { e.stopPropagation(); navigateSupplier(props.id, "delete") }}>
                        <MdDelete size={15} />
                    </button>
                </td>
            </tr>
        </>
    )
};

export default SupplierItem;
