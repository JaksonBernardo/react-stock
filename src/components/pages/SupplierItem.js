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
        <div className="supplier-card shadow" onClick={() => navigateSupplier(props.id, "edit")}>
            
            <div className="icon-area">
                <MdFactory size={32} />
            </div>

            <div className="info-area">
                <span className="name">{props.name}</span>
                <span className="contact">{props.cnpj} – {props.email}</span>
            </div>

            <div className="actions">
                <button className="btn-action edit" onClick={(e) => { e.stopPropagation(); navigateSupplier(props.id, "edit") }}>
                    <MdEdit size={20} />
                </button>

                <button className="btn-action delete" onClick={(e) => { e.stopPropagation(); navigateSupplier(props.id, "delete") }}>
                    <MdDelete size={20} />
                </button>
            </div>

        </div>
    );
};

export default SupplierItem;
