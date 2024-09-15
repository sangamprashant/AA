const StydyMaterialHelp = () => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>HTML Tag</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;h1&gt;Heading 1&lt;/h1&gt;</td>
            <td>
              <h1 className="text-primary">Heading 1</h1>
            </td>
          </tr>
          <tr>
            <td>&lt;h2&gt;Heading 2&lt;/h2&gt;</td>
            <td>
              <h2 className="text-primary">Heading 2</h2>
            </td>
          </tr>
          <tr>
            <td>&lt;h3&gt;Heading 3&lt;/h3&gt;</td>
            <td>
              <h3 className="text-primary">Heading 3</h3>
            </td>
          </tr>
          <tr>
            <td>&lt;h4&gt;Heading 4&lt;/h4&gt;</td>
            <td>
              <h4 className="text-primary">Heading 4</h4>
            </td>
          </tr>
          <tr>
            <td>&lt;h5&gt;Heading 5&lt;/h5&gt;</td>
            <td>
              <h5 className="text-primary">Heading 5</h5>
            </td>
          </tr>
          <tr>
            <td>&lt;h6&gt;Heading 6&lt;/h6&gt;</td>
            <td>
              <h6 className="text-primary">Heading 6</h6>
            </td>
          </tr>
          <tr>
            <td>&lt;p&gt;This is a paragraph.&lt;/p&gt;</td>
            <td>
              <p className="text-muted">
                This is a paragraph. Use paragraphs to organize content into
                readable sections. <br />
                You can use <code>&lt;br&gt;</code> for line breaks.
              </p>
            </td>
          </tr>
          <tr>
            <td>&lt;hr&gt;</td>
            <td>
              <hr className="my-4" />
              <p className="text-dark">Content above and below the line.</p>
              <hr className="my-4" />
            </td>
          </tr>
          <tr>
            <td>&lt;br&gt;</td>
            <td>
              <p className="text-info">
                Line 1<br />
                Line 2<br />
                Line 3
              </p>
            </td>
          </tr>

          <tr>
            <td>&lt;p className="text-success"&gt;Success text&lt;/p&gt;</td>
            <td>
              <p className="text-success">Success text</p>
            </td>
          </tr>
          <tr>
            <td>&lt;p className="text-danger"&gt;Danger text&lt;/p&gt;</td>
            <td>
              <p className="text-danger">Danger text</p>
            </td>
          </tr>
          <tr>
            <td>&lt;p className="text-warning"&gt;Warning text&lt;/p&gt;</td>
            <td>
              <p className="text-warning">Warning text</p>
            </td>
          </tr>
          <tr>
            <td>&lt;p className="text-info"&gt;Info text&lt;/p&gt;</td>
            <td>
              <p className="text-info">Info text</p>
            </td>
          </tr>
          <tr>
            <td>&lt;p className="text-light"&gt;Light text&lt;/p&gt;</td>
            <td>
              <p className="text-light bg-dark">Light text</p>
            </td>
          </tr>
          <tr>
            <td>&lt;p className="text-dark"&gt;Dark text&lt;/p&gt;</td>
            <td>
              <p className="text-dark">Dark text</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StydyMaterialHelp;
