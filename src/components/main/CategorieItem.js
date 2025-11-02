import { FiMoreVertical } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const CategorieItem = ({ categoryName, productRelationship }) => {

    return (
        <>
            <div className="categorie-item">
                <div className="infos">
                    <span className="categorie-name">{categoryName}</span>
                    <span className="categorie-products">{productRelationship} produto(s) relacionado(s)</span>
                </div>
                <div className="categorie-actions">
                    <MdEdit size={20} color='#357b37'/>
                    <MdDelete size={20} color='#357b37'/>
                </div>
            </div>
        </>
    )

}

export default CategorieItem;