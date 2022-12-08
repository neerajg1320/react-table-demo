import Button from 'react-bootstrap/Button';
import Select from "react-select";

const ColumnsEditBox = ({columns, onEdit, onCancel, onButtonClick}) => {
  // console.log(`Rendering <ColumnsEditBox>`);

  // We haven't used state here as we do not want to rerender the component
  // when setting the columnValues
  const columnValues = [];

  const handleSaveClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    if (onEdit) {
      const modifiedFields = columnValues
                              .filter(item => item.active)
                              .map(item => [item.name, item.value]);
      if (onEdit) {
        onEdit(Object.fromEntries(modifiedFields));
      }
    }
  }

  const handleCancelClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <>
    {/* We can try grid here*/}
    {columns.map((col, col_idx) => {
      columnValues.push({
        active: false,
        name: col.accessor
      });

      return (
          <div key={col_idx}
               style={{
                 display:"flex",
                 flexDirection:"row",
                 alignItems: "center",
                 gap:"10px"
               }}
          >
            <div>
              <input
                  type="checkbox"
                  onChange={e => {
                    columnValues[col_idx].active = e.target.checked;
                  }}
              />
            </div>

            <div style={{minWidth:"80px"}}>
              {col.Header}
            </div>

            <div>{(col.type === "input") ?
                <form>
                  <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter phone"
                        onChange={e => {
                          columnValues[col_idx].value = e.target.value;
                        }}
                    />
                  </div>
                </form>
                :
                (col.type === "select") ?

                    <Select
                        options={col.choices.map(choice => {return {label: choice, value:choice}})}
                        value={columnValues[col_idx].value}
                        onChange={option => {columnValues[col_idx].value = option.value}}
                        styles={{container: provided => ({
                            ...provided,
                            width: 150
                          })}}
                        // isDisabled={false}
                    />
                    :
                    ""
            }</div>
          </div>
        )}
      )}

      <div style={{
        display: "flex",
        justifyContent:"end",
        paddingRight: "20px",
        gap: "10px"
      }}>
        <Button
            variant="outline-danger"
            size="sm"
            onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
            variant="primary"
            size="sm"
            onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </>
  );
}

export default ColumnsEditBox;