import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            placeholder="Search movies..."
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
