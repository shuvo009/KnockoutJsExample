window.koExample = {};//Namespace

(function (koExample) {

    function product() {
        var self = this;
        self.sku = ko.observable("");
        self.description = ko.observable("");
        self.price = ko.observable(0.00);
        self.cost = ko.observable(0.00);
        self.quantity = ko.observable(0.00);
        self.image = ko.observable();
        self.productSummary = ko.computed(function () {
            return self.cost().toString() + " " + self.quantity().toString();
        });
    }

    koExample.Product = product;
}(window.koExample));

(function (koExample) {

    function prodcutViewModel() {
        var self = this;
        self.selectedProduct = ko.observable();
        self.productCollection = ko.observableArray([]);
        self.listViewSelectedItem = ko.observable(null);
        self.IsDeleteOrUpdateAble = ko.observable(true);

        self.AddProduct = function() {
            var p = new koExample.Product();
            self.IsDeleteOrUpdateAble(false);
            self.selectedProduct(p);
        }.bind(self);

        self.SaveProduct = function() {
            var p = self.selectedProduct();
            if (!p)
                return;
            if (self.productCollection.indexOf(p) > -1)
                return;
            self.productCollection.push(p);
            self.selectedProduct(null);
            self.productCollection.valueHasMutated();
            self.IsDeleteOrUpdateAble(true);
        }.bind(self);

        self.UpdateProduct = function() {
            var p = self.selectedProduct();
            if (!p)
                return;
            if (self.productCollection.indexOf(p) < 0)
                return;
            var product = ko.utils.arrayFirst(self.productCollection, function (pro) {
                return pro.sku === p.sku;
            });

            if (!product)
                return;
            ko.mapping.fromJS(p, product);
            self.selectedProduct(null);
            self.productCollection.valueHasMutated();
            self.IsDeleteOrUpdateAble(true);

        }.bind(self);

        $('.MainContinar').live("click", function(e) {
            self.listViewSelectedItem(ko.dataFor(this));
        });

        self.RemoveProduct = function() {
            var p = self.selectedProduct;
            if (!p)
                return;
            self.productCollection.remove(p);
            self.selectedProduct(null);
            self.IsDeleteOrUpdateAble(true);
        }.bind(self);

        self.SortBySku = function() {
            self.productCollection.sort(function(left, right) {
                return left.sku().toLowerCase() === right.sku.toLowerCase ? 0 : (left.sku().toLowerCase < right.sku().toLowerCase ? -1 : 1);
            });
        }.bind(self);

        self.listViewSelectedItem.subscribe(function(product) {
            if (product) {
                self.IsDeleteOrUpdateAble(true);
                self.selectedProduct(product);
            }
        });

        self.LoadData = function () {
            var p1 = new koExample.Product();
            p1.sku("sku1");
            p1.description("desc");
            p1.price(10);
            p1.cost (20);
            p1.quantity(30);
            p1.image("/Image/1.png");
            self.productCollection.push(p1);
            
            var p2 = new koExample.Product();
            p2.sku("sku2");
            p2.description("decs2");
            p2.price("10");
            p2.cost("60");
            p2.quantity("70");
            p2.image("/Image/2.jpg");
            self.productCollection.push(p2);

        };

    }
    
    koExample.ProductViewModel = prodcutViewModel;

}(window.koExample));

(function (koExample) {

    function bindingViewModel () {
       this.run = function () {
            var vm = new koExample.ProductViewModel();
            vm.LoadData();
            ko.applyBindings(vm);
        };
    }

    koExample.App = bindingViewModel;
    
}(window.koExample));



