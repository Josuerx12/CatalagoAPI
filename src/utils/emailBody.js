function accountRecovery({ name, email, senha }) {
  return `
    
    <!DOCTYPE html>
    <html>
    <head>
        <title>Recuperação de Conta</title>
        <style>
            h1 {
                color: #333;
            }
    
            ul {
                list-style-type: none;
                padding: 0;
            }
    
            li {
                margin-bottom: 10px;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
    
            th {
                background-color: #f2f2f2;
            }
    
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Recuperação de Conta</h1>
        <p>Olá ${name},</p>
        <p>Você solicitou a recuperação da sua conta. Aqui estão os detalhes da sua conta:</p>
        <table>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${email}</td>
            </tr>
            <tr>
                <td><strong>Nova Senha:</strong></td>
                <td>${senha}</td>
            </tr>
        </table>
        <p>Por favor, use as informações acima para acessar sua conta. Se você não solicitou a recuperação da conta, entre em contato conosco imediatamente.</p>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte Catalogo API</p>
    </body>
    </html>
    
    `;
}
function accountCreated({ name, email, senha }) {
  return `
  <html>
  <head>
      <title>Conta Criada com Sucesso</title>
      <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
  </head>
  <body>
      <h1>Conta Criada com Sucesso!</h1>
      <p>Olá ${name},</p>
      <p>Sua conta foi criada com sucesso. Aqui estão os detalhes da sua conta:</p>
      <table>
      <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
      </tr>
      <tr>
          <td><strong>Senha:</strong></td>
          <td>${senha}</td>
      </tr>
  </table>
      <p>Guarde essas informações com segurança.</p>
      <p>Obrigado por se juntar a nós!</p>
      <p>Atenciosamente,</p>
      <p>Catálogo API</p>
  </body>
  </html>
  `;
}

module.exports = { accountCreated, accountRecovery };
