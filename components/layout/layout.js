import Header from './Header/Header';
// import MainHeader from './main-header';
import BreadcrumbsProvider from '../../store/BreadcrumbsProvider';
import FilterProvider from '../../store/FilterProvider';

const Layout = (props) => {
  return (
    <BreadcrumbsProvider>
      <div className="layout">
        {/* <MainHeader /> */}
        <Header projectName="Temp Project Name" />
        {/* <Header /> */}
        <FilterProvider>
          <main>{props.children}</main>
        </FilterProvider>
      </div>
    </BreadcrumbsProvider>
  );
};

export default Layout;
