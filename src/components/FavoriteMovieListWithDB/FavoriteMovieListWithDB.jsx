import { useSelector, useDispatch } from "react-redux";
import styles from './FavoriteMovieListWithDB.module.css';
import FavoriteMovie from "../FavoriteMovie/FavoriteMovie";
import { selectFilteredMovies } from "../../redux/selector";
import { deleteMovies } from "../../redux/operations";

const FavoriteMovieListWithDB = () => {
    const dispatch = useDispatch();
    const filteredMovies = useSelector(selectFilteredMovies);
    const handleDelete = (id) => {
        dispatch(deleteMovies(id));
    };

    return (
        <div className={styles.container}>
            <ul className={styles.movie}>
                {filteredMovies.map(({ id, title, rating, release_date, image }) => (
                    <FavoriteMovie
                        key={id}
                        id={id}
                        title={title}
                        rating={rating}
                        release_date={release_date}
                        image={image}
                        onDelete={() => handleDelete(id)}
                    />
                ))}
            </ul>
        </div>
    );
};
export default FavoriteMovieListWithDB;