import Table from './Table'
const ListCategories = (props: any) => {
    return (
        <>
          <Table data={props.categories} />

        </>
    );
};

export default ListCategories;