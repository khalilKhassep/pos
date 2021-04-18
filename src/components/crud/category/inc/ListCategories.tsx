import Table from './Table'
const ListCategories = (props: any) => {
    return (
        <>
          <Table data={props.categories}></Table>
         {/* {Array.isArray(categories) && categories.length ? <Table data={categories} /> : "there is not data"} */}
        </>
    );
};

export default ListCategories;