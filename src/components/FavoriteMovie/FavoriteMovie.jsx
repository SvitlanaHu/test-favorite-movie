import Button from '../Button/Button';
import styles from './FavoriteMovie.module.css';

const FavoriteMovie = ({ id, title, rating, release_date, image, onDelete }) => {
    const defaultImg =
        "https://doingwell.mit.edu/wp-content/uploads/2023/10/Movie-Night.jpeg";

    return (
        <div className={styles.card} id={id}>
            <li className={styles.item}>
                <img
                    src={
                        image
                            ? `https://image.tmdb.org/t/p/w500${image}`
                            : defaultImg
                    }
                    alt="${title}"
                    className={styles.img}
                />
                <div className={styles.box}>
                    <h2>{title}</h2>

                    <div className={styles.str}>
                        <p>Рейтинг: {rating} </p>
                        <p>Дата виходу: {release_date} </p>
                    </div>
                </div>
                <Button type={"button"} onClick={onDelete} id={id}>
                    Delete
                </Button>
            </li >

        </div >

    );
};
export default FavoriteMovie;