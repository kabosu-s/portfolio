import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, basePath }) => {
  return (
    <nav>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <li key={page}>
              <Link href={`${basePath}/${page}`}>

                <span className={page === currentPage ? 'active' : ''}>{page}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
