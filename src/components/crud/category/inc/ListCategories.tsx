import Table from './Table'
const ListCategories = (props: any) => {
    return (
        <>
          <Table data={props.categories} setData={props.setCategories} />
        </>
    );
};

export default ListCategories;