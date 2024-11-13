from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///menu.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Plato(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    imagen_url = db.Column(db.String(200), nullable=False)  

@app.route('/')
def home():
    return redirect(url_for('restaurantepagina'))

@app.route('/restaurantepagina')
def restaurantepagina():
    platos = Plato.query.all()  
    return render_template('restaurantepagina.html', platos=platos)

@app.route('/menu')
def menus():
    platos = Plato.query.all()
    print(platos)
    return render_template('menu.html', platos=platos)

@app.route('/reservas')
def reservas():
    return render_template('reservas.html')

@app.route('/resenas')
def resenas():
    return render_template('resenas.html')

@app.route('/login')
def login():
    return render_template('Login.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        if not Plato.query.first():
            plato1 = Plato(nombre='Fideos con salsa champignon', precio=9000, imagen_url='image.png')
            plato2 = Plato(nombre='Hamburguesa con doble queso y panceta', precio=12000, imagen_url='hamburguesa.jpg')
            plato3 = Plato(nombre='Milanesa napolitana con papas fritas', precio=15000, imagen_url='milanesa.jpg')
            plato4 = Plato(nombre='Pizza de muzzarella con orégano', precio=11000, imagen_url='pizza.jpeg')

            db.session.add_all([plato1, plato2, plato3, plato4])
            db.session.commit()

    app.run(debug=True)
