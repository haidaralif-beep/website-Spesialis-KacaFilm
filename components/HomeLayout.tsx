import Navbar from '../components/NavBar';
import BackToTop from '../components/BackToTop';
import SmoothScroll from '../components/SmoothScroll';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SmoothScroll />
      {children}
      <BackToTop />
    </>
  );
}
