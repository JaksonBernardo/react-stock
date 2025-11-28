import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CategorieItem = ({ categoryId, categoryName, productRelationship }) => {

    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    
    const deleteCategory = async (event) => {

        const isDelete = await Swal.fire({
            title: `Deletar categoria ${categoryName}?`,
            text: "Essa ação não poderá ser desfeita",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(227, 45, 45, 1)',
            cancelButtonColor: '#357b37',
            confirmButtonText: 'Deletar',
            cancelButtonText: 'Cancelar'
        });

        if (isDelete.isConfirmed) {

            try {

                const response = await fetch(`http://localhost:4000/products/delete-category/${categoryId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                Swal.fire('Deletado!', 'A categoria foi removida.', 'success');

                navigate("/dashboard/categories");

            } catch (error) {

                console.error(error);
                Swal.fire('Ops!', 'Houve algum problema ao deletar a categoria', 'error');

            }

        }

    }

    return (
        <>
            <div className="categorie-item">
                <div className="infos">
                    <span className="categorie-name">{categoryName}</span>
                    <span className="categorie-products">{productRelationship} produto(s) relacionado(s)</span>
                </div>
                <div className="categorie-actions">
                    <MdEdit size={20} color='#357b37'/>
                    <MdDelete size={20} color='#357b37' onClick={(e) => deleteCategory(e)} />
                </div>
            </div>
        </>
    )

}

export default CategorieItem;