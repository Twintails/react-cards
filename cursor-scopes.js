var editor = atom.workspace.getActiveTextEditor()
let cursor1,
    cursor2,
    cursor3,
    cursor4,
    cursor5,
    cursor1BufferPos,
    cursor2BufferPos,
    cursor3BufferPos,
    cursor4BufferPos,
    cursor5BufferPos,
    cursor1Scopes,
    cursor2Scopes,
    cursor3Scopes,
    cursor4Scopes,
    cursor5Scopes;
cursor1 = atom.workspace.getActiveTextEditor().cursors[0];
cursor2 = atom.workspace.getActiveTextEditor().cursors[1];
cursor3 = atom.workspace.getActiveTextEditor().cursors[2];
cursor4 = atom.workspace.getActiveTextEditor().cursors[3];
cursor5 = atom.workspace.getActiveTextEditor().cursors[4];
cursor1BufferPos = cursor1.getBufferPosition();
cursor2BufferPos = cursor2.getBufferPosition();
cursor3BufferPos = cursor3.getBufferPosition();
cursor4BufferPos = cursor4.getBufferPosition();
cursor5BufferPos = cursor5.getBufferPosition();
cursor1Scopes = editor.scopeDescriptorForBufferPosition(cursor1BufferPos).scopes;
cursor2Scopes = editor.scopeDescriptorForBufferPosition(cursor2BufferPos).scopes;
cursor3Scopes = editor.scopeDescriptorForBufferPosition(cursor3BufferPos).scopes;
cursor4Scopes = editor.scopeDescriptorForBufferPosition(cursor4BufferPos).scopes;
cursor5Scopes = editor.scopeDescriptorForBufferPosition(cursor5BufferPos).scopes;
cursor1Scopes;
