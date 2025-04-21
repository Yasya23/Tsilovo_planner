import { Sidebar } from './components/_sidebar/Sidebar';
import styles from './Layout.module.scss';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.Main}>
      <Sidebar />
      {children}
    </main>
  );
}
